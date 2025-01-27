import { FormControl, MenuItem, Select } from "@mui/material";

interface SelectProps {
    onChange?: (value: any) => void;
    value?: string | any;
    options: { label: String, value: string }[]
    placeholder?: string;
    error?: boolean;
    errorText?: string | undefined | null | any;
}

const StyledSelect: React.FC<SelectProps> = ({ value, onChange, error, errorText, options }) => {
    return (
        <>
            <FormControl fullWidth>
                <Select
                    error={error}
                    value={value}
                    displayEmpty
                    onChange={onChange}
                >
                    <MenuItem value={""}>Choose...</MenuItem>
                    {options?.map((items: any) => {
                        return (
                            <MenuItem value={String(items?.value)}>{items?.label}</MenuItem>
                        )
                    })}
                </Select>
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

export default StyledSelect
