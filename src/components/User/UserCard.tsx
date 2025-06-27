import { Avatar } from "@radix-ui/themes";
import { DialogModal } from "../ui/DialogModal";
import { useAuth } from "../Context";
import LoginForm from "../LoginForm";
import { SignInIcon, SignOutIcon } from "@phosphor-icons/react";
import * as Tabs from "@radix-ui/react-tabs";
import { useUpdateChecker } from "@/hooks/useUpdateChecker";
import { useUserConfiguration } from "@/hooks/useUserConfigurations";
import { UpdateModal } from "../ui/UpdateModal";

export const UserConfig = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const { config, updateConfig } = useUserConfiguration();
  const {
    updateAvailable,
    releaseData,
    modalOpen,
    setModalOpen,
    handleInstallNow,
    triggerManualUpdate,
  } = useUpdateChecker();

  const UserInfo = () => (
    <div className="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-lg flex items-center">
      {isAuthenticated ? (
        <div className="flex gap-2 items-center">
          <Avatar radius="large" src={currentUser?.photoURL} fallback="LR" />
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium text-white">
              {currentUser?.displayName}
            </span>
            <span className="text-xs text-zinc-400">{currentUser?.email}</span>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 font-semibold text-white">
          Fazer login <SignInIcon size={20} weight="regular" />
        </div>
      )}
    </div>
  );

  const UserConfig = () => (
    <Tabs.Root defaultValue="user" orientation="vertical" className="flex">
      <div className="flex flex-col justify-between border-r pr-4 min-w-[200px]">
        <Tabs.List className="flex flex-col space-y-1">
          <Tabs.Trigger
            value="user"
            className="text-left px-3 py-2 text-sm font-medium rounded-md hover:bg-purple-200 hover:text-purple-600 data-[state=active]:text-purple-600 data-[state=active]:bg-purple-00"
          >
            Usuário
          </Tabs.Trigger>
          <Tabs.Trigger
            value="settings"
            className="text-left px-3 py-2 text-sm font-medium rounded-md hover:bg-purple-200 hover:text-purple-600 data-[state=active]:text-purple-600 data-[state=active]:bg-purple-00"
          >
            Configurações
          </Tabs.Trigger>
        </Tabs.List>

        <button
          onClick={() => logout()}
          className="flex gap-2 items-center px-4 py-2 mt-4 text-sm font-semibold text-red-600 bg-red-100 hover:bg-red-200 rounded-md absolute bottom-4"
        >
          Sair da conta
          <SignOutIcon size={20} weight="regular" />
        </button>
      </div>

      <div className="p-6 w-full space-y-6">
        <Tabs.Content value="user" className="space-y-6">
          <h1 className="text-2xl font-semibold">Perfil do Usuário</h1>
          <div className="flex items-center space-x-4">
            <Avatar
              radius="full"
              className="rounded-full"
              src={currentUser?.photoURL}
              fallback="LR"
            />
            <div>
              <p className="text-lg font-semibold">
                {currentUser?.displayName}
              </p>
              <p className="text-gray-400 text-sm">{currentUser?.email}</p>
            </div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="settings" className="space-y-6">
          <h1 className="text-2xl font-semibold">Configurações do Aplicativo</h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Tema</label>
              <select className="w-full border rounded-md px-3 py-2 text-sm">
                <option>Claro</option>
                <option>Escuro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Notificações
              </label>
              <select className="w-full border rounded-md px-3 py-2 text-sm">
                <option>Ativadas</option>
                <option>Desativadas</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-600">
                Buscar atualizações automaticamente
              </label>
              <input
                type="checkbox"
                checked={config.autoUpdate}
                onChange={(e) =>
                  updateConfig({ autoUpdate: e.target.checked })
                }
                className="h-4 w-4 rounded border-gray-300 text-purple-600"
              />
            </div>

            {updateAvailable ? (
              <button
                onClick={() => setModalOpen(true)}
                className="text-purple-600 hover:underline text-sm"
              >
                Atualizar agora
              </button>
            ) : (
              <button
                onClick={triggerManualUpdate}
                className="text-purple-600 hover:underline text-sm"
              >
                Buscar Atualizações
              </button>
            )}
          </div>

          <button className="mt-4 rounded-md bg-purple-600 text-white px-4 py-2 text-sm hover:bg-purple-700">
            Salvar configurações
          </button>
        </Tabs.Content>
      </div>

      {releaseData && (
        <UpdateModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          release={releaseData}
          onInstall={handleInstallNow}
        />
      )}
    </Tabs.Root>
  );

  return (
    <DialogModal
      dialogTrigger={<UserInfo />}
      dialogContent={<>{isAuthenticated ? <UserConfig /> : <LoginForm />}</>}
    />
  );
};
