"use client";

import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/layout";
import { getInterests } from "@/lib/api";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function GetInterests() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const {
    data,
    isLoading,
    refetch,
    error: queryError,
  } = useQuery({
    queryKey: ["interests", getValues("userId")],
    queryFn: () => getInterests(getValues("userId")),
    enabled: false,
    retry: false,
    staleTime: 60000, // 1 minute
  });

  const onSubmit = async () => {
    await refetch();
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userId" className="text-orange-800">
              User ID
            </Label>
            <Input
              id="userId"
              {...register("userId")}
              placeholder="Enter user ID"
              className="border-orange-300 focus:border-orange-500 focus:ring-orange-500"
            />
            {errors.userId && (
              <p className="text-sm text-orange-600">{errors.userId.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Get Interests"}
          </Button>
        </form>

        {data?.recommendations?.length > 0 && (
          <div className="space-y-2">
            <h2 className="font-semibold text-orange-800">Interests</h2>
            <div className="space-y-2">
              {data.recommendations.map((interest, index) => (
                <div
                  key={index}
                  className="p-3 bg-orange-50 rounded-lg text-orange-800"
                >
                  {interest}
                </div>
              ))}
            </div>
          </div>
        )}

        {queryError && (
          <Alert variant="info">
            <AlertDescription>
              {queryError instanceof Error
                ? queryError?.response?.data?.errors[0].message
                : "An error occurred while fetching interests"}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </Layout>
  );
}
