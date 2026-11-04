import 'dart:io';

import 'package:mason/mason.dart';
import 'package:yaml/yaml.dart';
import 'package:yaml_edit/yaml_edit.dart';

const _workspaceDescriptor = 'pnpm-workspace.yaml';

/// Peer ranges this application needs the host workspace to accept.
const _allowedPeerVersions = {
  // Storybook (Vite) depends on tsconfck, which declares typescript ^5.
  'tsconfck>typescript': '6',
};

void run(HookContext context) {
  final workspaceFile = _findWorkspaceFile(Directory.current);

  if (workspaceFile == null) {
    context.logger.warn(
      'No $_workspaceDescriptor found: add these peerDependencyRules.allowedVersions '
      'to the host workspace: $_allowedPeerVersions',
    );
    return;
  }

  final editor = YamlEditor(workspaceFile.readAsStringSync());
  final added = <String>[];

  for (final entry in _allowedPeerVersions.entries) {
    if (_ensureAllowedPeerVersion(editor, entry.key, entry.value)) {
      added.add(entry.key);
    }
  }

  if (added.isEmpty) return;

  workspaceFile.writeAsStringSync(editor.toString());
  context.logger.info(
    'Added to ${workspaceFile.path} peerDependencyRules.allowedVersions: '
    '${added.join(', ')}',
  );
}

File? _findWorkspaceFile(Directory start) {
  var cursor = start.absolute;

  while (true) {
    final candidate = File('${cursor.path}/$_workspaceDescriptor');
    if (candidate.existsSync()) return candidate;
    if (cursor.parent.path == cursor.path) return null;
    cursor = cursor.parent;
  }
}

/// Sets `peerDependencyRules.allowedVersions[key]` unless the workspace
/// already declares it. Returns whether the file changed.
bool _ensureAllowedPeerVersion(YamlEditor editor, String key, String value) {
  const rulesKey = 'peerDependencyRules';
  const allowedKey = 'allowedVersions';
  final root = editor.parseAt([]);

  if (root is! YamlMap) {
    editor.update([], {
      rulesKey: {
        allowedKey: {key: value},
      },
    });
    return true;
  }

  final rules = root.nodes[rulesKey];
  if (rules is! YamlMap) {
    editor.update([rulesKey], {
      allowedKey: {key: value},
    });
    return true;
  }

  final allowed = rules.nodes[allowedKey];
  if (allowed is! YamlMap) {
    editor.update([rulesKey, allowedKey], {key: value});
    return true;
  }

  if (allowed.containsKey(key)) return false;

  editor.update([rulesKey, allowedKey, key], value);
  return true;
}
