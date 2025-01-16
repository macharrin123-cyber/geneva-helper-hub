import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ProviderAvailability } from "@/integrations/supabase/types";
import { Clock } from "lucide-react";

const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const AvailabilityCalendar = ({ providerId }: { providerId: string }) => {
  const [availabilities, setAvailabilities] = useState<ProviderAvailability[]>([]);
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const { toast } = useToast();

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      const { data, error } = await supabase
        .from("provider_availability")
        .select("*")
        .eq("provider_id", providerId);

      if (error) throw error;
      setAvailabilities(data || []);
    } catch (error) {
      console.error("Error fetching availability:", error);
      toast({
        title: "Error",
        description: "Failed to load availability",
        variant: "destructive",
      });
    }
  };

  const handleSaveAvailability = async () => {
    try {
      const { error } = await supabase
        .from("provider_availability")
        .upsert({
          provider_id: providerId,
          day_of_week: selectedDay,
          start_time: startTime,
          end_time: endTime,
        }, {
          onConflict: "provider_id,day_of_week"
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Availability updated successfully",
      });

      fetchAvailability();
    } catch (error) {
      console.error("Error saving availability:", error);
      toast({
        title: "Error",
        description: "Failed to save availability",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Manage Availability
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label>Select Day</Label>
              <select
                className="w-full mt-1 rounded-md border border-gray-300 p-2"
                value={selectedDay}
                onChange={(e) => setSelectedDay(parseInt(e.target.value))}
              >
                {DAYS_OF_WEEK.map((day, index) => (
                  <option key={index} value={index}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Time</Label>
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div>
                <Label>End Time</Label>
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={handleSaveAvailability} className="w-full">
              Save Availability
            </Button>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Current Availability</h3>
            <div className="space-y-2">
              {availabilities.map((availability) => (
                <div
                  key={availability.id}
                  className="p-3 bg-gray-50 rounded-md flex justify-between items-center"
                >
                  <span>{DAYS_OF_WEEK[availability.day_of_week]}</span>
                  <span className="text-sm text-gray-600">
                    {availability.start_time.slice(0, 5)} - {availability.end_time.slice(0, 5)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailabilityCalendar;