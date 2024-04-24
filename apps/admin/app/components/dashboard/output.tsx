"use client";

import { useAuthStore } from "../../store/useAuthStore";

export default function Output() {
  const { user } = useAuthStore();
  return (
    <div>
      {user ? (
        <ul>
          <li>{user.id}</li>
          <li>{user.userName}</li>
          <li>{user.department}</li>
        </ul>
      ) : null}
    </div>
  );
}
