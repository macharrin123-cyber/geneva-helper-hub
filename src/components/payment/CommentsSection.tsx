import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface CommentsSectionProps {
  comments: string;
  onChange: (value: string) => void;
}

const CommentsSection = ({ comments, onChange }: CommentsSectionProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Additional Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Add any special instructions or comments for the service provider (optional)"
          value={comments}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[100px]"
        />
      </CardContent>
    </Card>
  );
};

export default CommentsSection;