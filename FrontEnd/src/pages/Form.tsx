import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
} from "@mui/material";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { useApi } from "../hooks/axios";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import StyledInput from "../components/StyledInput";
import StyledTextArea from "../components/StyledTextArea";
import StyledSelect from "../components/StyledSelect";
import StyledDatePicker from "../components/StyledDatePicker";
import StyledRadioButton from "../components/StyledRadioButton";

interface FormProps {
  full_name: string;
  birth_date: string | any;
  gender: string;
  claim_type: string;
  address: string;
  pan_number: string;
}

const validationSchema = yup.object().shape({
  full_name: yup.string().required("Full name is required").trim(),
  birth_date: yup.string().required("Birth date is required"),
  gender: yup.string().required("Gender is required"),
  claim_type: yup.string().required("Claim type is required"),
  address: yup.string().required("Address is required").max(500, "Max 500 characters allowed").trim(),
  pan_number:
    yup.string()
      .required("PAN number is required").max(10, "Max 10 characters allowed").min(10, "Min 10 characters allowed")
      .matches(/^[A-Za-z0-9]+$/, 'PAN Number must only contain letters and numbers').trim(),
});

const Form = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const claim_id = params.get('id');

  const { handleSubmit, control, reset, setValue } = useForm<FormProps>({
    resolver: yupResolver(validationSchema),
    mode: "all",
    defaultValues: {
      full_name: "",
      birth_date: null,
      gender: "",
      claim_type: "",
      pan_number: "",
      address: ""
    }
  });

  const convertDateDDMMYYYY = (date: string) => {
    const date_value = date?.split("T")
    const convert_date = date_value?.[0]?.split("-")
    const new_date = `${convert_date?.[2]}-${convert_date?.[1]}-${convert_date?.[0]}`
    return new_date
  }

  // Get Claim By id 
  const onSuccessById = (response: AxiosResponse | any) => {
    const claims_data = response?.data
    setValue("full_name", claims_data?.fullName)
    setValue("birth_date", convertDateDDMMYYYY(claims_data?.dateOfBirth))
    setValue("gender", claims_data?.gender)
    setValue("claim_type", claims_data?.claimType)
    setValue("pan_number", claims_data?.pan)
    setValue("address", claims_data?.addreess)
  }
  const onFailureById = (error: AxiosError | any) => {
    toast.error(error?.data?.message ?? "Semething went wrong")
  }
  const { callFetch: callFetchById, } = useApi({ onSuccess: onSuccessById, onFailure: onFailureById })

  useEffect(() => {
    if (claim_id) {
      callFetchById("get", `/api/Claims/${claim_id}`)
    }
  }, [claim_id])

  // add/edit Claims 
  const onSuccessAdd = (response: AxiosResponse | any) => {
    if (response?.data?.flag) {
      toast.success(response?.data?.message)
      navigate("/list")
    } else {
      toast.error(response?.data?.message)
    }
  }

  const onFailureAdd = (error: AxiosError | any) => {
    toast.error(error?.data?.message ?? "Semething went wrong")
  }

  const { callFetch: callFetchAdd, isloading: isloadingAdd } = useApi({ onSuccess: onSuccessAdd, onFailure: onFailureAdd })

  const convertDateYYYYMMDD = (date: string) => {
    const date_value = date?.split("-")
    const new_date = `${date_value[2]}-${date_value[1]}-${date_value[0]}`
    return new_date
  }

  const CreateCurentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
  }

  const onSubmit = (data: FormProps) => {
    const payload = {
      claimsId: claim_id ? Number(claim_id) : 0,
      fullName: data?.full_name,
      dateOfBirth: convertDateYYYYMMDD(data?.birth_date),
      claimType: Number(data?.claim_type),
      gender: data?.gender,
      addreess: data?.address,
      pan: data?.pan_number,
      createdDate: CreateCurentDate()
    }

    callFetchAdd(`${claim_id ? "put" : "post"}`, "/api/Claims", payload)
  };
  return (
    <>
      <Container>
        <div className="mt-10 px-5">
          <Box className="grid grid-cols-12 ">
            <Card className="col-span-12 lg:col-span-10  xl:col-span-10 p-6 mb-2" style={{ background: "rgba(239, 239, 240,1)" }}>
              <div className="col-span-12 flex justify-center text-3xl font-medium text-blue-600 font-serif ">
                Claim Test
              </div>
            </Card>
          </Box>
          <div>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-12"
            >
              <Card
                className="col-span-12 lg:col-span-10 xl:col-span-10 p-5 lg:px-10"
                style={{ background: "rgba(239, 239, 240,.3)" }}
              >
                <div className="grid grid-cols-12 gap-3 lg:gap-x-15 md:gap-5">
                  <div className="col-span-12 md:col-span-6">
                    <label className="font-medium text-sm text-gray-700">
                      Full Name
                    </label>
                    <div className="mt-1">
                      <Controller
                        name="full_name"
                        control={control}
                        render={({
                          field: { onChange, value },
                          fieldState: { error, isDirty, invalid },
                        }) => (
                          <>
                            <StyledInput
                              value={value}
                              onChange={onChange}
                              placeholder="Enter name"
                              error={invalid && (!isDirty || isDirty)}
                              errorText={error?.message}
                            />
                          </>
                        )}
                      />
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <label className="font-medium text-sm text-gray-700">
                      Date Of Birth
                    </label>
                    <div className="mt-1">
                      <Controller
                        name="birth_date"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error, isDirty, invalid } }) => (
                          < >
                            <StyledDatePicker
                              value={value ? dayjs(value, 'DD/MM/YYYY') : null}
                              onChange={(newValue: any) => {
                                const date = new Date(newValue);
                                const day = String(date.getDate()).padStart(2, '0');
                                const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
                                const year = date.getFullYear();
                                const formattedDate = `${day}-${month}-${year}`;
                                onChange(formattedDate)
                              }}
                              error={invalid && (!isDirty || isDirty)}
                              errorText={error?.message}
                              format="DD/MM/YYYY"
                            />
                          </>
                        )}
                      />
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <label className="font-medium text-sm text-gray-700">Gender</label>
                    <div className="mt-1">
                      <Controller
                        name="gender"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error, isDirty, invalid } }) => (
                          <>
                            <StyledSelect
                              value={value}
                              onChange={onChange}
                              options={[{ label: "Male", value: "male" }, { label: "Female", value: "female" }]}
                              error={invalid && (!isDirty || isDirty)}
                              errorText={error?.message}
                            />
                          </>
                        )}
                      />
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <label className="font-medium text-sm text-gray-700">
                      Claim Type
                    </label>
                    <div className="mt-1">
                      <Controller
                        name="claim_type"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error, isDirty, invalid } }) => (
                          <>
                            <StyledRadioButton
                              row={true}
                              value={value}
                              onChange={onChange}
                              options={[{ label: "Full", value: "1" }, { label: "Partial", value: "2" }]}
                              error={invalid && (!isDirty || isDirty)}
                              errorText={error?.message}
                            />
                          </>
                        )}
                      />
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <label className="font-medium text-sm text-gray-700">PAN</label>
                    <div className="mt-1">
                      <Controller
                        name="pan_number"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error, isDirty, invalid } }) => (
                          <>
                            <StyledInput
                              value={value}
                              onChange={onChange}
                              placeholder="Enter PAN"
                              error={invalid && (!isDirty || isDirty)}
                              errorText={error?.message}
                            />
                          </>
                        )}
                      />
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <label className="font-medium text-sm text-gray-700">Address</label>
                    <div className="mt-1">
                      <Controller
                        name="address"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error, isDirty, invalid } }) => (
                          <>
                            <StyledTextArea
                              value={value}
                              onChange={onChange}
                              placeholder="Enter address..."
                              error={invalid && (!isDirty || isDirty)}
                              errorText={error?.message}
                            />
                          </>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-12 flex mt-8 gap-5">
                  <Button
                    size="large"
                    type="button"
                    variant="outlined"
                    className="basis-1/2 md:basis-1/5 lg:basis-38 xl:basis-32"
                    onClick={() => {
                      reset({
                        full_name: "",
                        birth_date: null,
                        gender: "",
                        claim_type: "",
                        address: "",
                        pan_number: "",
                      });
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    size="large"
                    type="submit"
                    variant="contained"
                    className="basis-1/2 md:basis-1/5 lg:basis-38 xl:basis-32"
                    disabled={isloadingAdd}
                  >
                    {
                      isloadingAdd && (<CircularProgress color="primary" size={15} thickness={6} />)
                    }
                    <span className="ms-2">
                      {
                        claim_id ? (<span>Update</span>) : (<span>Submit</span>)
                      }
                    </span>
                  </Button>
                </div>
              </Card>

            </Box>
          </div>
        </div>

      </Container>
    </>
  );
};

export default Form;
