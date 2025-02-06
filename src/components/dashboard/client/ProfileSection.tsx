import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon, UserRound } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ProfileData {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  imageUrl: string;
}

interface ProfileSectionProps {
  profileData: ProfileData;
  setProfileData: (data: ProfileData) => void;
}

const ProfileSection = ({ profileData, setProfileData }: ProfileSectionProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setUploading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      console.log('Starting image upload to Supabase storage...');

      const { error: uploadError } = await supabase.storage
        .from("provider-images")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Error uploading image:", uploadError);
        throw uploadError;
      }

      console.log('Image uploaded successfully, getting public URL...');

      const { data: { publicUrl } } = supabase.storage
        .from("provider-images")
        .getPublicUrl(filePath);

      console.log('Got public URL:', publicUrl);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.id) {
        throw new Error("No user ID found");
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ image_url: publicUrl })
        .eq("id", user.id);

      if (updateError) {
        console.error("Error updating profile:", updateError);
        throw updateError;
      }

      setProfileData({ ...profileData, imageUrl: publicUrl });

      toast({
        title: "Success",
        description: "Profile image updated successfully",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="mb-6 md:mb-8">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 text-center md:text-left">
          Profile Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleProfileUpdate} className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={profileData.firstName}
                onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={profileData.lastName}
                onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={profileData.phone}
              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={profileData.address}
              onChange={(e) => setProfileData({...profileData, address: e.target.value})}
              className="mt-1"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-base md:text-lg font-semibold">Job notifications</h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="emailNotif">Email (mandatory)</Label>
              <Switch
                id="emailNotif"
                checked={profileData.emailNotifications}
                onCheckedChange={(checked) => setProfileData({...profileData, emailNotifications: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="pushNotif">Push</Label>
              <Switch
                id="pushNotif"
                checked={profileData.pushNotifications}
                onCheckedChange={(checked) => setProfileData({...profileData, pushNotifications: checked})}
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Update details
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;