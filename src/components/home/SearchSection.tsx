import { Search, HelpingHand } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

interface SearchSectionProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchSection = ({ searchTerm, onSearchChange, onSearchSubmit }: SearchSectionProps) => {
  const { t } = useLanguage();

  return (
    <div className="text-center mb-12 animate-fade-in">
      <div className="flex items-center justify-center gap-2 mb-8">
        <HelpingHand className="h-12 w-12 text-primary" />
        <h1 className="text-4xl font-bold text-primary font-poppins">
          Helpify
        </h1>
      </div>
      
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        {t('home.title')}
      </h2>
      <p className="text-xl text-gray-600 mb-8">
        {t('home.subtitle')}
      </p>
      
      <form onSubmit={onSearchSubmit} className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder={t('home.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-12 text-lg w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default SearchSection;