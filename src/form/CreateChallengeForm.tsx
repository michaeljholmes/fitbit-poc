import { Button, TextField, Box, Typography, Stack } from "@mui/material";
import {
  useForm,
  Controller,
  SubmitHandler,
  useFieldArray,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { rem } from "polished";
import { ErrorMessage } from '@hookform/error-message';
import { CreateTeam, Team } from "./CreateTeam";

interface Challenge {
  challenge: string;
  teams: Team[];
}


const minimumTeams = 2;
const maxTotal = 4;

const teamSchema = yup.object({
  teamName: yup.string().required("Required").max(50, "50 character limit"),
  members: yup
    .array()
    .of(
      yup.object({
        value: yup
          .string()
          .email("Email must be valid")
          .required("Required")
          .max(60),
      }),
    )
    .min(1, "Each team must have at least one member")
    .required()
});


const challengeSchema = yup.object({
  challenge: yup.string().required("Required").max(50, "50 character limit"),
  teams: yup
    .array()
    .of(teamSchema)
    .min(minimumTeams, `You need at least ${minimumTeams} teams`)
    .required()
});

export const CreateChallengeForm = () => {
  const { handleSubmit, control, watch, formState: {errors}, getValues} = useForm<Challenge>({
    mode: "onBlur",
    defaultValues: {
      challenge: "",
      teams: [],
    },
    resolver: yupResolver(challengeSchema),
  });

  const onSubmit: SubmitHandler<Challenge> = (data) => {
    console.log("SUBMITTED");
    console.log(data);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "teams",
  });

  console.log(errors);
  console.log({values: getValues()})

  return (
    <>
      <Typography>Create your team</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="challenge"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <TextField
                sx={{ m: 1 }}
                size="small"
                label="Challenge name"
                variant="outlined"
                {...field}
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
              />
            );
          }}
        />
        <Stack flexDirection="row" alignItems={"center"}>
          <Typography>
            You must have a minimum of {minimumTeams} teams.
          </Typography>
          <Button
            sx={{ ml: 1 }}
            variant="contained"
            disabled={fields.length >= maxTotal}
            onClick={() => append({teamName: "", members: []})}
          >
            Add team
          </Button>
        </Stack>
        {fields.map((item, index) => (
          <Box key={item.id}>
            <Stack flexDirection="row">
              <CreateTeam 
                name={`teams.[${index}]`}
                control={control}
                errors={errors}
              />
              <Button
                variant="contained"
                sx={{ height: rem(40), mt: 1 }}
                onClick={() => remove(index)}
              >
                Remove team
              </Button>
            </Stack>
          </Box>
        ))}
        {errors?.teams?.root?.message && <Typography>Own Error -{errors.teams.root.message}</Typography>}
        {/* <ErrorMessage errors={errors} name="teams"/> */}
        <Button sx={{ mt: 1 }} variant="contained" type="submit">
          Create Team
        </Button>
      </form>
    </>
  );
};