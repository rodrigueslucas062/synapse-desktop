import { useEffect, useState, useRef } from "react";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { NewNoteCards } from "./NewNoteCards";
import { NoteCards } from "./NoteCards";
import { load } from "@tauri-apps/plugin-store";
import { toast } from "sonner";

export type Note = {
  id: string;
  date: string;
  content: string;
  userId: string;
};

const NotepadCards = () => {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const storeRef = useRef<any>(null);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const store = await load("notes.json", { autoSave: true });
        storeRef.current = store;

        const savedNotes = await store.get<Note[]>("notes");
        if (Array.isArray(savedNotes)) {
          setNotes(savedNotes);
        }
      } catch (err) {
        toast.error("Erro ao carregar suas notas.");
      }
    })();
  }, []);

  useEffect(() => {
    if (!storeRef.current) return;

    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(async () => {
      try {
        await storeRef.current.set("notes", notes);
        await storeRef.current.save();
      } catch (err) {
        toast.error("Erro ao salvar suas notas.");
      }
    }, 500);
  }, [notes]);

  const onNoteCreated = (content: string) => {
    if (!content.trim()) return;

    const newNote: Note = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      content: content.trim(),
      userId: "local",
    };

    setNotes((prev) => [newNote, ...prev]);
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="mx-auto max-w-6xl space-y-6 p-4">
      <div className="relative rounded-lg inline-block w-full bg-white border-4 border-zinc-900 text-zinc-900 shadow-[8px_8px_0px_rgba(0,0,0,0.75)]">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="block w-full focus:outline-none rounded-xl border-0 py-3 text-gray-900 bg-white placeholder:text-gray-400 pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <MagnifyingGlassIcon
          size={20}
          weight="duotone"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCards onNoteCreated={onNoteCreated} />
        {filteredNotes.map((note) => (
          <NoteCards
            key={note.id}
            date={note.date}
            content={note.content}
            handleDeleteNote={() => handleDeleteNote(note.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default NotepadCards;
