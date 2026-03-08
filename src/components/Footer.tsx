import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
              <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">P</span>
              <span>PromptVault</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              De-centralized marketplace for high-quality AI prompts. Sell your prompts and earn coins.
            </p>
            <div className="flex gap-4">
              <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Github className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Marketplace</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/explore" className="hover:text-primary">All Prompts</Link></li>
              <li><Link href="/explore?category=writing" className="hover:text-primary">Writing</Link></li>
              <li><Link href="/explore?category=design" className="hover:text-primary">Design</Link></li>
              <li><Link href="/explore?category=dev" className="hover:text-primary">Development</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Sell</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/sell" className="hover:text-primary">List a Prompt</Link></li>
              <li><Link href="/dashboard" className="hover:text-primary">Seller Dashboard</Link></li>
              <li><Link href="/seller-terms" className="hover:text-primary">Seller Terms</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} PromptVault. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
