import { UseQueryResult, useQuery } from "react-query";
import { FitbitDetails } from "../../api.types";
import { getFitbitDetails } from "../../requests/fitbitRequests";

export const useFititDetails = (): UseQueryResult<FitbitDetails> => {

    return useQuery({
      queryKey: ["getFitbitDetails"],
      queryFn: () => getFitbitDetails("")
    });
}