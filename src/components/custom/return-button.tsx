"use client";
import { Button } from "../ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface ReturnButtonProps {
  href: string;
  label: string;
}

const ReturnButton = ({ href, label }: ReturnButtonProps) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push(href)}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      <ArrowLeftIcon className="w-4 h-4" />
      <span>{label}</span>
    </Button>
  );
};

export default ReturnButton;
