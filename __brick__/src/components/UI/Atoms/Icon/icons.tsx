/**
 * Project icon set — lucide.
 * One set for the whole app: use `<Icon icon={Icons.Search} size="m" />`.
 * The keys name what an icon means, not what it draws, so swapping the glyph
 * behind a meaning is a one-line change here. Add the icons a project needs.
 * Brand marks lucide does not ship (social networks) live in ./brand and share
 * the same call signature, so they are interchangeable here.
 * @see https://lucide.dev/icons
 */

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleAlert,
  CircleCheck,
  ExternalLink,
  Eye,
  EyeOff,
  Info,
  LayoutGrid,
  List,
  LoaderCircle,
  Mail,
  MapPin,
  Menu,
  Minus,
  Moon,
  Plus,
  Search,
  Sun,
  TriangleAlert,
  User,
  X,
} from "lucide-react";

import {
  Discord,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Pinterest,
  Tiktok,
  Twitter,
  Youtube,
} from "./brand";

export const Icons = {
  /* Navigation */
  ArrowLeft,
  ArrowRight,
  /** Opens elsewhere: an external page, a detail. */
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Menu,
  Close: X,
  ExternalLink,

  /* Actions */
  Search,
  Plus,
  Minus,
  Check,
  /** Show password. */
  View: Eye,
  /** Hide password. */
  ViewOff: EyeOff,

  /* Status */
  Info,
  CheckCircle: CircleCheck,
  Warning: TriangleAlert,
  Error: CircleAlert,
  Loading: LoaderCircle,

  /* Theme */
  /** Light theme (shown by the theme toggle while the dark one is on). */
  Sun,
  /** Dark theme (shown by the theme toggle while the light one is on). */
  Moon,

  /* Content */
  List,
  Grid: LayoutGrid,
  User,
  Email: Mail,
  Location: MapPin,

  /* Brand marks */
  Discord,
  Facebook,
  GitHub: Github,
  Instagram,
  LinkedIn: Linkedin,
  Pinterest,
  TikTok: Tiktok,
  Twitter,
  YouTube: Youtube,
} as const;

export type IconName = keyof typeof Icons;
