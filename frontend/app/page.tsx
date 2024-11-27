"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/layout";
import { Minus, Plus } from "lucide-react";
import { createInterests } from "@/lib/api";
import { InterestsFormData, interestsSchema } from "@/lib/schemas";
import { useToast } from "@/hooks/use-toast";

export default function CreateInterests() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<InterestsFormData>({
    resolver: zodResolver(interestsSchema),
    defaultValues: {
      userId: "",
      interests: [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "interests",
  });

  const mutation = useMutation({
    mutationFn: createInterests,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Interests created successfully!",
        variant: "success",
      });

      form.reset();
      queryClient.invalidateQueries({
        queryKey: ["interests"],
      });

      router.push("/get-interests");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.errors?.[0]?.message ||
        error.message ||
        "Something went wrong";

      // Show error in ShadCN Toaster
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InterestsFormData) => {
    mutation.mutate({
      userId: data.userId,
      preferences: data.interests,
    });
  };

  return (
    <Layout>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md mx-auto space-y-6"
      >
        <div className="space-y-2">
          <Label htmlFor="userId" className="text-orange-800">
            User ID
          </Label>
          <Input
            id="userId"
            {...form.register("userId")}
            placeholder="Enter user ID"
            className="border-orange-300 focus:border-orange-500 focus:ring-orange-500"
          />
          {form.formState.errors.userId && (
            <p className="text-sm text-orange-600">
              {form.formState.errors.userId.message}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <Label className="text-orange-800">Interests</Label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <Input
                {...form.register(`interests.${index}`)}
                placeholder={`Interest ${index + 1}`}
                className="border-orange-300 focus:border-orange-500 focus:ring-orange-500"
              />
              {index > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => remove(index)}
                  className="border-orange-300 text-orange-600 hover:bg-orange-100"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          {form.formState.errors.interests && (
            <p className="text-sm text-orange-600">
              {form.formState.errors.interests?.message || "Invalid interests"}
            </p>
          )}
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full border-orange-300 text-orange-600 hover:bg-orange-100"
          onClick={() => append("")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Interest
        </Button>

        <Button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Submit"}
        </Button>
      </form>
    </Layout>
  );
}
