import { FormControl, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface DatePickertProps {
    onChange?: (value: any) => void;
    value?: string | any;
    placeholder?: string;
    className?: string;
    error?: boolean;
    errorText?: string | undefined | null | any;
    format?: string
}

const StyledDatePicker: React.FC<DatePickertProps> = ({ value, onChange, error, errorText, format }) => {
    return (
        <>
            <div style={{ borderWidth: "1px", borderColor: `${error ? "red" : "#E1E1E1"}`, borderRadius: "5px" }}>
                <FormControl fullWidth>
                    <DesktopDatePicker
                        value={value}
                        onChange={onChange}
                        className="w-full"
                        disableFuture
                        format={format ?? "DD/MM/YYYY"}
                    />
                </FormControl>
            </div>
            {error && (
                <p className="text-red-500 text-[13px]">
                    {errorText}
                </p>
            )
            }
        </>
    )
}

export default StyledDatePicker
