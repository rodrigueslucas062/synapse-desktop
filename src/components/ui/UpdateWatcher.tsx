import { useUpdateChecker } from "@/hooks/useUpdateChecker";
import { UpdateModal } from "./UpdateModal";

export const UpdateWatcher = () => {
  const {
    releaseData,
    modalOpen,
    setModalOpen,
    handleInstallNow,
  } = useUpdateChecker();

  if (!modalOpen || !releaseData) return null;

  return (
    <UpdateModal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      release={releaseData}
      onInstall={handleInstallNow}
    />
  );
};
