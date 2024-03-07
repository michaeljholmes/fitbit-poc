import { UseMutationResult, useMutation } from "react-query";
import { postUser } from "../../requests/userRequests";
import { User } from "../../api.types";

export const useCreateUser = (): UseMutationResult<User, unknown, string>=> {
    return useMutation({
      mutationFn: (email) => postUser(email),
      mutationKey: ["createNewUser"]
    });
}