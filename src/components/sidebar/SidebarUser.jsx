import { Circle, LogOut } from "lucide-react"

export default function SidebarUser({
  userName,
  wsConnected,
  collapsed,
  onLogout,
}) {
  return (
    <div className="border-t border-zinc-800 p-3">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700 text-sm font-semibold">
            {userName.slice(0, 2).toUpperCase()}
          </div>
          <Circle
            className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 ${
              wsConnected ? "fill-green-500" : "fill-red-500"
            }`}
          />
        </div>

        {!collapsed && (
          <div className="flex-1">
            <div className="truncate text-sm font-medium">{userName}</div>
            <button
              onClick={onLogout}
              className="mt-1 flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
