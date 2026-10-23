import Link from "next/link";
import { Rocket } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cosmic-bg flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-cosmic-primary/10 border border-cosmic-primary/20 flex items-center justify-center">
            <Rocket className="w-10 h-10 text-cosmic-primary" />
          </div>
        </div>

        <h1 className="text-6xl font-display font-bold text-cosmic-text mb-2">
          4<span className="text-cosmic-primary">0</span>4
        </h1>

        <p className="text-lg text-cosmic-text-secondary mb-2 font-display">
          Lost in Space
        </p>

        <p className="text-sm text-cosmic-text-dim mb-8">
          The coordinates you entered don&apos;t match any known location in our
          digital universe.
        </p>

        <Link
          href="/"
          className="btn-primary inline-flex"
        >
          <Rocket className="w-4 h-4 rotate-[-45deg]" />
          Return to Base
        </Link>
      </div>
    </div>
  );
}
