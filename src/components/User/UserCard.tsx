import { Avatar } from "@radix-ui/themes";
import { DialogModal } from "../ui/DialogModal";
import { useAuth } from "../Context";
import LoginForm from "../LoginForm";
import { SignInIcon, SignOutIcon } from "@phosphor-icons/react";
import * as Tabs from "@radix-ui/react-tabs";
import { checkForUpdate } from "@/utils/UpdateChecker";

export const UserConfig = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();

  const UserInfo = () => {
    return (
      <>
        {isAuthenticated ? (
          <div className="bg-zinc-800 h-15 hover:bg-zinc-700 p-2 rounded-lg flex items-center">
            <div className="flex gap-2">
              <Avatar
                radius="large"
                src={currentUser?.photoURL}
                fallback="LR"
              />
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-white">
                  {currentUser?.displayName}
                </span>
                <span className="text-xs text-zinc-400">
                  {currentUser?.email}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-zinc-800 h-fit font-semibold hover:bg-zinc-700 p-3 rounded-lg flex items-center justify-center">
            <div className="flex gap-2">
              Fazer login
              <SignInIcon size={20} weight="regular" />
            </div>
          </div>
        )}
      </>
    );
  };

  const UserConfig = () => {
    return (
      <Tabs.Root defaultValue="user" orientation="vertical" className="flex">
        <div className="flex flex-col justify-between border-r pr-4 min-w-[200px]">
          <Tabs.List className="flex flex-col space-y-1">
            <Tabs.Trigger
              value="user"
              className="text-left px-3 py-2 text-sm font-medium rounded-md hover:bg-blue-100 data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50"
            >
              Usuário
            </Tabs.Trigger>
            <Tabs.Trigger
              value="settings"
              className="text-left px-3 py-2 text-sm font-medium rounded-md hover:bg-blue-100 data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50"
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

        <div className="p-4">
          <Tabs.Content value="user" className="space-y-6">
            <h1 className="text-2xl font-semibold">Perfil do Usuário</h1>
            <div className="flex items-center space-x-4">
              <Avatar radius="full" src={currentUser?.photoURL} fallback="LR" />
              <div>
                <p className="text-lg font-semibold">{currentUser?.name}</p>
                <p className="text-gray-600">{currentUser?.email}</p>
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="settings" className="space-y-6">
            <h1 className="text-2xl font-semibold">
              Configurações do Aplicativo
            </h1>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Tema</label>
                <select className="border rounded-md px-3 py-2 text-sm">
                  <option>Claro</option>
                  <option>Escuro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Notificações
                </label>
                <select className="border rounded-md px-3 py-2 text-sm">
                  <option>Ativadas</option>
                  <option>Desativadas</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label className="block text-sm text-gray-600 mb-1">
                  Buscar atualizações automaticamente
                </label>
                <button onClick={checkForUpdate} className="text-blue-600 hover:underline text-sm">
                  Buscar Atualizações
                </button>
              </div>
            </div>

            <button className="mt-4 rounded-md bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700">
              Salvar configurações
            </button>
          </Tabs.Content>
        </div>
      </Tabs.Root>
    );
  };

  return (
    <DialogModal
      dialogTrigger={<UserInfo />}
      dialogContent={<>{isAuthenticated ? <UserConfig /> : <LoginForm />}</>}
    />
  );
};
