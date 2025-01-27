import { FormControl, TextField } from "@mui/material";

interface InputProps {
    onChange?: (value: any) => void;
    value?: string | any;
    placeholder?: string;
    className?: string;
    type?: string;
    error?: boolean;
    errorText?: string | undefined | null | any;
}

const StyledInput: React.FC<InputProps> = ({ value, onChange, error, errorText, placeholder, className }) => {
    return (
        <>
            <FormControl fullWidth>
                <TextField
                    variant="outlined"
                    placeholder={placeholder ?? ""}
                    className={`${className} w-full`}
                    value={value}
                    onChange={onChange}
                    error={error}
                />
            </FormControl>
            {error && (
                <p className="text-red-500 text-[13px]">
                    {errorText}
                </p>
            )
            }
        </>
    )
}

export default StyledInput
