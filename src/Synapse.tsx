import * as Tabs from "@radix-ui/react-tabs";

export const Synapse = () => {
  return (
    <>
      <Tabs.Content value="new-tab">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-white text-3xl font-bold">Synapse</h1>
          <p className="text-gray-400">
            Welcome to Synapse, your AI-powered assistant.
          </p>
        </div>
      </Tabs.Content>

      <Tabs.Content value="add-tab">
        <div className="p-4 bg-zinc-800 rounded-md text-white">
          <span className="text-indigo-300 font-medium">Documents:</span> Access
          and update your documents.
        </div>
      </Tabs.Content>
    </>
  );
};
