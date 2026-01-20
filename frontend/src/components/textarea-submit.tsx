import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group"
// import { Textarea } from "./ui/textarea"
import { cn } from "@/lib/utils"
import { Spinner } from "./ui/spinner"
import { useRef } from "react";

export function TextareaSubmit({ className, loading, onEnterPress, ...props }: React.ComponentProps<"textarea"> & { loading?: boolean, onEnterPress?: () => void }) {
  const textarea = useRef<HTMLTextAreaElement>(null);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
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
          className="flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 pt-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
          placeholder="Write a comment..."
          disabled={loading}
          onKeyDown={handleKeyDown}
          ref={textarea}
          {...props}
        />
        <InputGroupAddon align="block-end" className="pt-0" onClick={forwardFocus}>
          <InputGroupButton type="submit" className="ml-auto" size="sm" variant="default" disabled={loading}>
            {loading && <Spinner />}
            Submit
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
