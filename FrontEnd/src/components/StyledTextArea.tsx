import Textarea from "@mui/joy/Textarea";

interface TextAreaProps {
    onChange?: (value: any) => void;
    value?: string | any;
    placeholder?: string;
    className?: string;
    type?: string;
    error?: boolean;
    errorText?: string | undefined | null | any;
    minRow?: number;
    maxRow?: number;
}

const StyledTextArea: React.FC<TextAreaProps> = ({ value, onChange, error, errorText, placeholder, minRow, maxRow }) => {
    return (
        <>
            <Textarea
                style={{ background: "#FAFAFA", border: `1px solid ${error ? "red" : "#E1E1E1"}`, }}
                minRows={minRow ?? 2}
                maxRows={maxRow ?? 4}
                placeholder={placeholder ?? ""}
                variant="outlined"
                value={value}
                onChange={onChange}
                error={error}
            />
            {error && (
                <p className="text-red-500 text-[13px]">
                    {errorText}
                </p>
            )
            }
        </>
    )
}

export default StyledTextArea
