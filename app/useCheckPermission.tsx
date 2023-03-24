// useCameraPermission.ts
import { useState, useEffect } from "react";

type PermissionStatusState = null | "granted" | "denied" | "prompt";

const useCheckPermission = (): PermissionStatusState => {
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionStatusState | null>(null);

  useEffect(() => {
    const checkPermission = async () => {
      if (navigator.permissions) {
        try {
          const status = await navigator.permissions.query({
            name: "camera" as PermissionName,
          });
          setPermissionStatus(status.state as PermissionStatusState);

          const handleChange = () => {
            setPermissionStatus(status.state as PermissionStatusState);
          };

          status.onchange = handleChange;
          return () => {
            status.onchange = null;
          };
        } catch (error) {
          console.error("Permission query error:", error);
        }
      } else {
        console.log("Permissions API not supported by this browser");
      }
    };

    checkPermission();
  }, []);

  return permissionStatus;
};

export default useCheckPermission;
