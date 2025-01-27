import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

interface RadioButtonProps {
    onChange?: (value: any) => void;
    value?: string | any;
    options: { label: String, value: string }[]
    placeholder?: string;
    error?: boolean;
    errorText?: string | undefined | null | any;
    row?: boolean
}

const StyledRadioButton: React.FC<RadioButtonProps> = ({ value, onChange, error, errorText, options, row }) => {
    return (
        <>
            <FormControl
                style={{
                    border: `1px solid ${error ? "red" : "#E1E1E1"}`,
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                }}
            >
                <RadioGroup
                    row={row ?? false}
                    value={value}
                    onChange={onChange}
                >
                    <div className="flex gap-5 ms-3">
                        <FormControlLabel
                            value=""
                            control={<Radio />}
                            label=""
                            hidden={true}
                        />
                        {
                            options?.map((items: any) => {
                                return (
                                    <FormControlLabel
                                        value={String(items?.value)}
                                        control={<Radio />}
                                        label={items?.label}
                                    />
                                )
                            })
                        }
                    </div>
                </RadioGroup>
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

export default StyledRadioButton
