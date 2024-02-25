import { Button, TextField, Box, Typography, Stack, Tab } from "@mui/material";
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
import { useState, SyntheticEvent } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";

interface Competition {
  competition: string;
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


const competitionSchema = yup.object({
  competition: yup.string().required("Required").max(50, "50 character limit"),
  teams: yup
    .array()
    .of(teamSchema)
    .min(minimumTeams, `You need at least ${minimumTeams} teams`)
    .required()
});

export const CreateCompetitionForm = () => {
  const { handleSubmit, control, watch, formState: {errors, touchedFields}, getValues} = useForm<Competition>({
    mode: "all",
    defaultValues: {
      competition: "",
      teams: [],
    },
    resolver: yupResolver(competitionSchema),
  });


  const onSubmit: SubmitHandler<Competition> = (data) => {
    console.log("SUBMITTED");
    console.log(data);
  };


  const { fields, append, remove } = useFieldArray({
    control,
    name: "teams",
  });


  const {teams} = watch();

  const [value, setValue] = useState("0");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const addTeam = () => {
    append({teamName: "", members: []});
    setValue((fields.length).toString());
  }
  const removeTeam = (index: number) => {
    remove(index);
    setValue("0");
  }
 
  return (
    <>
      <Typography>Create your team</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="competition"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <TextField
                sx={{ m: 1 }}
                size="small"
                label="Competition name"
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
            onClick={addTeam}
          >
            Add team
          </Button>
        </Stack>
        <TabContext value={value}>
          <TabList onChange={handleChange} >
            {teams.map(({teamName}, index) => {
               return <Tab key={index} label={`Team Name: ${index + 1}`} value={index.toString()} />
              }
            )}
          </TabList>
          {fields.map((item, index) => (
            <TabPanel value={index.toString()} key={item.id}>
              <CreateTeam 
                name={`teams.[${index}]`}
                control={control}
                errors={errors}
                removeTeam={() => removeTeam(index)}
                error={Boolean(errors && errors.teams && errors.teams[index])}
              />
            </TabPanel>
          ))}
        </TabContext>
        {Object.keys(errors).length > 0 && fields.length < 2 && <Typography sx={{color: (theme) => theme.palette.error.main}}>You must have two teams</Typography>}
        <Button sx={{ mt: 1 }} variant="contained" type="submit">
          Create Team
        </Button>
      </form>
    </>
  );
};
