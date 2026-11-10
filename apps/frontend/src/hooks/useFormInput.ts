import { useState } from "react";

export function useFormInput(initialValue: string = "") {
    const [value, setValue] = useState(initialValue);
    const [messages, setMessages] = useState<string[]>([]);

    function validate(
        validationCallback: (value: string) => string[]
    ): string[] {
        const errors = validationCallback(value);
        setMessages(errors);
        return errors;
    }

    function reset() {
        setValue(initialValue);
        setMessages([]);
    }

    return {
        value,
        setValue,
        messages,
        setMessages,
        validate,
        reset,
    };
}