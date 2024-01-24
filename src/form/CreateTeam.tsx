import { TextField, Stack, Typography, Button, Box } from "@mui/material";
import { rem } from "polished";
import { Controller, useFieldArray } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';


export interface Team {
    teamName: string;
    members: { value: string }[];
}


interface TeamProps {
    control: any;
    errors: any;
    maxTotal?: number;
    name: string;
    removeTeam: () => void;
    error: boolean;
}


export const CreateTeam = ({control, errors, maxTotal= 4, name, removeTeam, error}: TeamProps) => {

    const { fields, append, remove } = useFieldArray({
        control,
        name: `${name}.members`,
      });


    return(
        <Stack sx={{border: `${rem(1)} ${error ? "red": "black"} solid`, p: 1}}>
          <Stack flexDirection={"row"}>
            <Controller
              name={`${name}.teamName`}
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <TextField
                    sx={{ m: 1, width: rem(250)}}
                    size="small"
                    label="Team name"
                    variant="outlined"
                    {...field}
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                  />
                );
              }}
            />
                      <Button
                variant="contained"
                sx={{ height: rem(40), mt: 1 }}
                onClick={removeTeam}
              >
                Remove team
              </Button>
              </Stack>
        <Stack flexDirection="row" alignItems={"center"}>
          <Typography>
            Each team can have up to {maxTotal} members, you can add{" "}
            {maxTotal - fields.length === 0 ? "no" : maxTotal - fields.length}{" "}
            more.
          </Typography>
          <Button
            sx={{ ml: 1 }}
            variant="contained"
            disabled={fields.length >= maxTotal}
            onClick={() => append({value: ""})}
          >
            Add team member
          </Button>
        </Stack>
        {fields.map((item, index) => (
          <Box key={item.id}>
            <Stack flexDirection="row">
              <Controller
                name={`${name}.members.[${index}].value`}
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <TextField
                      sx={{ m: 1 }}
                      size="small"
                      label="Text field"
                      variant="outlined"
                      {...field}
                      error={Boolean(fieldState.error)}
                      helperText={fieldState.error?.message}
                    />
                  );
                }}
              />
              <Button
                variant="contained"
                sx={{ height: rem(40), mt: 1 }}
                onClick={() => remove(index)}
              >
                Remove member
              </Button>
            </Stack>
          </Box>
        ))}
        <ErrorMessage errors={errors} name={`[${name}].members`} render={({message}) => 
        <Typography sx={{color: (theme) => theme.palette.error.main}}>{message}</Typography>}/>
      </Stack>
    );
}
