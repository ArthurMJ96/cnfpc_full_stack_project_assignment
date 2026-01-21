import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
// import { Textarea } from "./ui/textarea"
import { cn } from "@/lib/utils";
import { Spinner } from "./ui/spinner";
import { useRef } from "react";

export { InputGroupButton as TextareaButton } from "@/components/ui/input-group";

export function TextareaSubmit({
  children,
  className,
  loading,
  textareaClassName,
  onEnterPress,
  ...props
}: React.ComponentProps<"textarea"> & {
  loading?: boolean;
  textareaClassName?: string;
  onEnterPress?: () => void;
}) {
  const textarea = useRef<HTMLTextAreaElement>(null);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      onEnterPress?.();
    }
  };
  const forwardFocus = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      textarea.current?.focus();
    }
  };

  return (
    <div className={cn("grid w-full gap-6", className)}>
      <InputGroup>
        <textarea
          data-slot="input-group-control"
          className={cn(
            "flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 pt-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm",
            textareaClassName,
          )}
          placeholder="Write a comment..."
          disabled={loading}
          onKeyDown={handleKeyDown}
          ref={textarea}
          {...props}
        />
        <InputGroupAddon
          align="block-end"
          className="pt-0 flex justify-end"
          onClick={forwardFocus}
        >
          {children}
          <InputGroupButton
            type="submit"
            size="sm"
            variant="default"
            disabled={loading}
          >
            {loading && <Spinner />}
            Send
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
