import { useQuery } from "@tanstack/react-query";
import { Check, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const { toast } = useToast();

  const { data: applications, isLoading, refetch } = useQuery({
    queryKey: ["service-provider-applications"],
    queryFn: async () => {
      console.log("Fetching service provider applications...");
      const { data, error } = await supabase
        .from("service_provider_applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching applications:", error);
        throw error;
      }

      console.log("Fetched applications:", data);
      return data;
    },
  });

  const handleStatusUpdate = async (id: string, status: "approved" | "denied") => {
    console.log(`Updating application ${id} status to ${status}`);
    const { error } = await supabase
      .from("service_provider_applications")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Error updating application:", error);
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: `Application ${status} successfully`,
    });
    refetch();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Service Provider Applications</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Rate (CHF)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications?.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">{app.name}</TableCell>
                <TableCell>{app.email}</TableCell>
                <TableCell>{app.phone}</TableCell>
                <TableCell>{app.service}</TableCell>
                <TableCell>{app.experience} years</TableCell>
                <TableCell>{app.hourly_rate}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      app.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : app.status === "denied"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {app.status || "pending"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-green-50 hover:bg-green-100 text-green-600"
                      onClick={() => handleStatusUpdate(app.id, "approved")}
                      disabled={app.status === "approved"}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-red-50 hover:bg-red-100 text-red-600"
                      onClick={() => handleStatusUpdate(app.id, "denied")}
                      disabled={app.status === "denied"}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminDashboard;