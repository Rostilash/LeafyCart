import { X } from "lucide-react";
import type { FC } from "react";

interface TagsEditorProps {
  tags: string[];
  newTag: string;
  setNewTag: (val: string) => void;
  onAdd: () => void;
  onRemove: (tag: string) => void;
}

export const TagsEditor: FC<TagsEditorProps> = ({ tags, newTag, setNewTag, onAdd, onRemove }) => {
  return (
    <fieldset className="border p-2 rounded-md">
      <legend className="font-semibold">Теги</legend>

      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Введіть тег (наприклад: 1+1, gift:123)"
          className="custum-border-outline px-2 py-1 flex-1"
        />
        <button type="button" onClick={onAdd} className="px-3 py-1 btn-primary-sm btn_hover">
          Додати
        </button>
      </div>

      {/* Tegs Preview */}
      <div className="flex flex-wrap gap-2">
        {(tags ?? []).map((tag) => (
          <span key={tag} className="flex items-center gap-1 bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
            {tag}
            <button type="button" onClick={() => onRemove(tag)} className="text-red-500 hover:text-red-700 cursor-pointer">
              <X size={18} />
            </button>
          </span>
        ))}
      </div>
    </fieldset>
  );
};
