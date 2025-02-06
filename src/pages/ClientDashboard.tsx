import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UserRound, ImageIcon, Star, MapPin, Calendar, Clock, DollarSign, Repeat, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";

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

const ClientDashboard = () => {
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        // Fetch profile data
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (profile) {
          setProfileData(prev => ({
            ...prev,
            id: profile.id,
            imageUrl: profile.image_url || ''
          }));
        }

        // Fetch unread messages count
        const { count } = await supabase
          .from('chat_messages')
          .select('*', { count: 'exact' })
          .eq('receiver_id', user.id)
          .eq('is_read', false);
        
        setUnreadMessages(count || 0);
      }
    };
    getUser();

    // Subscribe to new messages
    const channel = supabase
      .channel('chat-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `receiver_id=eq.${user?.id}`
        },
        (payload) => {
          console.log('New message received:', payload);
          setUnreadMessages(prev => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "Rukshan",
    lastName: "Srivarathan",
    email: "rukers75@gmail.com",
    phone: "7776924149",
    address: "38 Coleridge Road, Romford, RM3 7BB",
    emailNotifications: true,
    pushNotifications: false,
    imageUrl: ""
  });

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

      if (!user?.id) {
        throw new Error("No user ID found");
      }

      // Update profile data with new image URL
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ image_url: publicUrl })
        .eq("id", user.id);

      if (updateError) {
        console.error("Error updating profile:", updateError);
        throw updateError;
      }

      // Update local state with new image URL
      setProfileData(prev => ({
        ...prev,
        imageUrl: publicUrl
      }));

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

  const mockBookings = [
    {
      id: '1',
      user_id: '1',
      provider_id: '1',
      service_date: '2024-03-20',
      service_time: '14:00',
      street_address: '123 Main St',
      city: 'San Francisco',
      postal_code: '94105',
      comments: 'Please bring eco-friendly cleaning supplies',
      status: 'completed',
      created_at: '2024-03-15',
      provider_response: 'approved',
      payment_status: 'completed',
      payment_intent_id: null,
      address: '123 Main St, San Francisco',
      provider: {
        id: '1',
        user_id: '2',
        image_url: '/placeholder.svg',
        hourly_rate: 45,
        service_type: 'Cleaning',
        created_at: '2024-01-01',
        description: 'Professional cleaning service',
        name: 'John Doe',
        phone: null,
        experience: null,
        email: null,
        cv_url: null,
        linkedin_profile: null
      }
    },
    {
      id: '2',
      user_id: '1',
      provider_id: '2',
      service_date: '2024-03-22',
      service_time: '10:00',
      street_address: '456 Market St',
      city: 'San Francisco',
      postal_code: '94105',
      status: 'completed',
      created_at: '2024-03-14',
      provider_response: 'approved',
      payment_status: 'completed',
      payment_intent_id: null,
      address: '456 Market St, San Francisco',
      comments: null,
      provider: {
        id: '2',
        user_id: '3',
        image_url: '/placeholder.svg',
        hourly_rate: 60,
        service_type: 'Plumbing',
        created_at: '2024-01-01',
        description: 'Expert plumbing services',
        name: 'Jane Smith',
        phone: null,
        experience: null,
        email: null,
        cv_url: null,
        linkedin_profile: null
      }
    }
  ];

  const handleBookAgain = (providerId: string, serviceType: string) => {
    navigate(`/${serviceType.toLowerCase()}`, { state: { selectedProviderId: providerId } });
  };

  return (
    <div className="min-h-screen relative">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/lovable-uploads/e20a7267-cc03-45b8-a841-007d68e9aa3e.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 65%',
          backgroundAttachment: 'fixed',
          opacity: '0.5'
        }}
      />
      <div className="relative z-10">
        <Navigation />
        <main className="pt-16 md:pt-20 pb-8 md:pb-12 animate-fadeIn">
          {error && (
            <Alert variant="destructive" className="mb-4 md:mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Chat Icon with Notification Badge */}
          <div className="fixed right-6 bottom-6 z-50">
            <Button
              variant="default"
              size="icon"
              className="h-12 w-12 rounded-full shadow-lg"
              onClick={() => navigate('/chat')}
            >
              <MessageSquare className="h-6 w-6" />
              {unreadMessages > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center rounded-full"
                >
                  {unreadMessages}
                </Badge>
              )}
            </Button>
          </div>

          {/* Profile Image Section */}
          <div className="flex flex-col items-center mb-6 md:mb-8">
            <div className="relative mb-4">
              <label htmlFor="profile-image" className="cursor-pointer block">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-100 ring-4 ring-primary/20 hover:ring-primary/30 transition-all">
                  <div className="w-full h-full flex items-center justify-center relative group">
                    {profileData.imageUrl ? (
                      <img 
                        src={profileData.imageUrl} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserRound className="w-12 h-12 md:w-16 md:h-16 text-gray-400 group-hover:text-gray-500 transition-colors" />
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ImageIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                  </div>
                </div>
                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-full">
                  <div className="animate-spin rounded-full h-5 w-5 md:h-6 md:w-6 border-b-2 border-primary"></div>
                </div>
              )}
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              Welcome back {profileData.firstName}!
            </h2>
          </div>

          {/* Rest of the dashboard content */}
          <Card className="mb-6 md:mb-8">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 text-center md:text-left">Profile Information</CardTitle>
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

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center md:text-left">My Bookings</h1>
          
          <div className="grid gap-4 md:gap-6">
            {mockBookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="border-b border-gray-100 pb-4">
                  <CardTitle className="flex flex-col md:flex-row md:items-center gap-2">
                    <div className="flex-1 text-center md:text-left">
                      <span className="text-lg md:text-xl block md:inline">{booking.provider.service_type} Service</span>
                      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 mt-1 justify-center md:justify-start">
                        <span className="text-sm text-gray-600">Provider: {booking.provider.name}</span>
                        <div className="flex items-center gap-1 justify-center md:justify-start">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">4.8 (24 reviews)</span>
                        </div>
                      </div>
                    </div>
                    <span className={`text-sm px-3 py-1 rounded-full self-start md:self-center ${
                      booking.provider_response === 'approved' ? 'bg-green-100 text-green-800' : 
                      booking.provider_response === 'denied' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.provider_response.charAt(0).toUpperCase() + booking.provider_response.slice(1)}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 md:pt-6">
                  <div className="space-y-4 md:space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                      <div className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 md:w-5 md:h-5 text-gray-500 mt-1" />
                        <div>
                          <p className="text-xs md:text-sm text-gray-500">Date</p>
                          <p className="text-sm md:text-base font-medium">{new Date(booking.service_date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="w-4 h-4 md:w-5 md:h-5 text-gray-500 mt-1" />
                        <div>
                          <p className="text-xs md:text-sm text-gray-500">Time</p>
                          <p className="text-sm md:text-base font-medium">{booking.service_time}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-gray-500 mt-1" />
                        <div>
                          <p className="text-xs md:text-sm text-gray-500">Rate</p>
                          <p className="text-sm md:text-base font-medium">CHF {booking.provider.hourly_rate}/hour</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gray-500 mt-1" />
                        <div>
                          <p className="text-xs md:text-sm text-gray-500">Location</p>
                          <p className="text-sm md:text-base font-medium">{booking.city}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gray-500 mt-1" />
                      <div>
                        <p className="text-xs md:text-sm text-gray-500">Full Address</p>
                        <p className="text-sm md:text-base font-medium">{booking.street_address}, {booking.postal_code}</p>
                      </div>
                    </div>

                    {booking.comments && (
                      <div>
                        <p className="text-xs md:text-sm text-gray-500">Comments</p>
                        <p className="text-sm md:text-base font-medium">{booking.comments}</p>
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-4 border-t border-gray-100">
                      <div className="flex flex-wrap gap-2">
                        <div className={`inline-flex px-2 md:px-3 py-1 rounded-full text-xs md:text-sm ${
                          booking.provider_response === 'approved' 
                            ? 'bg-green-100 text-green-800' 
                            : booking.provider_response === 'denied'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          Provider Status: {booking.provider_response}
                        </div>

                        <div className={`inline-flex px-2 md:px-3 py-1 rounded-full text-xs md:text-sm ${
                          booking.payment_status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          Payment: {booking.payment_status}
                        </div>
                      </div>

                      {booking.status === 'completed' && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline"
                              size={isMobile ? "sm" : "default"}
                              className="w-full md:w-auto"
                            >
                              <Star className="w-4 h-4 mr-2" />
                              Leave Review
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Leave a Review</DialogTitle>
                            </DialogHeader>
                            <form className="space-y-4 mt-4">
                              <div>
                                <label className="block text-sm font-medium mb-2">Rating</label>
                                <select 
                                  name="rating"
                                  className="w-full border rounded-md p-2"
                                  required
                                >
                                  <option value="">Select rating</option>
                                  {[1, 2, 3, 4, 5].map((num) => (
                                    <option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-2">Review</label>
                                <textarea 
                                  name="text"
                                  className="w-full border rounded-md p-2"
                                  rows={4}
                                  required
                                  placeholder="Write your review here..."
                                />
                              </div>
                              <Button type="submit" className="w-full">
                                Submit Review
                              </Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                      )}
                      
                      <Button
                        variant="default"
                        size={isMobile ? "sm" : "default"}
                        className="w-full md:w-auto"
                        onClick={() => handleBookAgain(booking.provider.id, booking.provider.service_type)}
                      >
                        <Repeat className="w-4 h-4 mr-2" />
                        Book Again
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {mockBookings.length === 0 && (
              <Card>
                <CardContent className="py-8">
                  <p className="text-center text-gray-500">No bookings found.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientDashboard;
