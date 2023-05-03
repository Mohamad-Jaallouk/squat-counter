// useCameraPermission.ts
import { useState, useEffect } from "react";

type PermissionStatusState = null | "granted" | "denied" | "prompt";

async function checkPermission() {
  if (navigator.permissions) {
    try {
      const status = await navigator.permissions.query({
        name: "camera" as PermissionName,
      });
      return status.state as PermissionStatusState;
    } catch (error) {
      console.error("Permission query error:", error);
    }
  } else {
    console.log("Permissions API not supported by this browser");
  }
}

export default checkPermission;
