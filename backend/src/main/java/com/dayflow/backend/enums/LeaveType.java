package com.dayflow.backend.enums;

public enum LeaveType {
    PAID_TIME_OFF("Paid Time Off"),
    SICK_LEAVE("Sick Leave"),
    UNPAID_LEAVE("Unpaid Leave");

    private final String displayName;

    LeaveType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}