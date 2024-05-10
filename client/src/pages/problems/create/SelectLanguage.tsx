import { Checkbox } from "@/components/ui/checkbox";
import languages from "@/data/languages";

const SelectLanguage = ({
  selectedLanguages,
  setSelectedLanguages,
}: {
  selectedLanguages: string[];
  setSelectedLanguages: (value: string[]) => void;
}) => {

  return (
    <div>
      <h5>Select Languages</h5>
      <div className="mt-5 grid grid-cols-5">
        {languages.map((language) => (
          <div className="mb-5" key={language.value}>
            <Checkbox
              value={language.value}
              key={language.value}
              disabled={!language.isAvailable}
              checked={selectedLanguages.includes(language.value)}
              onCheckedChange={(e) => {
                if (e) {
                  setSelectedLanguages([...selectedLanguages, language.value]);
                } else {
                  setSelectedLanguages(
                    selectedLanguages.filter((lang) => lang !== language.value)
                  );
                }
              }}
            />
            <label
              htmlFor={language.name}
              className={`ml-2 ${!language.isAvailable && " text-gray-500"}`}
            >
              {language.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectLanguage;
