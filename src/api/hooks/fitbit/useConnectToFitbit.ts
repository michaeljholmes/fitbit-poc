import { UseMutationResult, useMutation, useQueryClient } from "react-query";
import { connectToFitbit } from "../../requests/userRequests";
import { User } from "../../api.types";

interface ConnectToFitbit {
    code: string,
    state: string
}

export const useConnectToFitbit = (): UseMutationResult<User, unknown, ConnectToFitbit>=> {

    // TBD
    const isLoggedIn = true; 
    const currentUserId = "user1";
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({code, state}: ConnectToFitbit) => connectToFitbit(currentUserId, code, state),
      mutationKey: ["connectToFitbit"],
      onSuccess: () => {
        queryClient.invalidateQueries('getUserById');
      },
    });
}