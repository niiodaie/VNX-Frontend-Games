import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">Page not found</p>
      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}
