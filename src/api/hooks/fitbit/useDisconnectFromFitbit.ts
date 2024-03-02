import { UseMutationResult, useMutation, useQueryClient } from "react-query";
import { disconnectToFitbit } from "../../requests/userRequests";
import { User } from "../../api.types";

export const useDisconnectFromFitbit = (): UseMutationResult<User, unknown, void>=> {

    // TBD
    const isLoggedIn = true; 
    const currentUserId = "user1";    
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: () => disconnectToFitbit(currentUserId),
      mutationKey: ["disconnectToFitbit"],
      onSuccess: () => {
        queryClient.invalidateQueries('getUserByEmail');
      },
    });
}