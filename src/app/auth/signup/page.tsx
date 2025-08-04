"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
    const router = useRouter();
    
    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd handle registration here.
        // For now, we'll just navigate to the dashboard.
        router.push("/dashboard");
    }

    return (
        <>
            <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold font-headline">Create an account</h1>
                <p className="text-balance text-muted-foreground">
                    Enter your information to create an account
                </p>
            </div>
            <form onSubmit={handleSignup} className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input id="first-name" placeholder="Max" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" placeholder="Robinson" required />
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                    Create an account
                </Button>
                <Button variant="outline" className="w-full">
                    Sign up with Google
                </Button>
            </form>
            <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/auth/login" className="underline">
                    Sign in
                </Link>
            </div>
        </>
    )
}
