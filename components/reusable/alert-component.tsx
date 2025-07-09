import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertComponent({
  title,
  description,
  variant,
}: {
  title: string;
  description: string;
  variant: "default" | "destructive";
}) {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      <Alert variant={variant ? variant : "default"}>
        <CheckCircle2Icon />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </div>
  );
}
