import 'dart:io';

import 'package:mason/mason.dart';

void run(HookContext context) async {
  await runPnpm(
    context: context
  );

}

String getWorkingDirectory(
    {required HookContext context, required String applicationName}) {
  return Directory.current.uri.resolve(applicationName).path;
}


Future<void> runPnpm({
  required HookContext context,
}) async {
  context.logger.info('📦 Running pnpm i');
  await Process.run('pnpm', ['i']);
  context.logger.success('📦 pnpm configured successfully 🚀');
}