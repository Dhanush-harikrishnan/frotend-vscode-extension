"use client"

import useSWR from "swr"
import type {
  ActivityLog,
  DetailedMetrics,
  BatchMetricsRequest,
  BatchActivityRequest,
  ApiResponse,
  ActivitiesResponse,
} from "@/lib/types/activity"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

/**
 * Hook to fetch all activity logs
 */
export function useActivities() {
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<ActivityLog[]>>(
    "/api/activity",
    fetcher
  )

  return {
    activities: data?.data || [],
    isLoading,
    isError: error,
    mutate,
  }
}

/**
 * Hook to fetch detailed metrics for a specific user and date
 */
export function useMetrics(username: string, date: string) {
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<DetailedMetrics>>(
    username && date ? `/api/metrics/${username}/${date}` : null,
    fetcher
  )

  return {
    metrics: data?.data,
    isLoading,
    isError: error,
    mutate,
  }
}

/**
 * Hook to fetch user summary for a specific date
 */
export function useUserSummary(username: string, date: string) {
  const { data, error, isLoading } = useSWR<ApiResponse>(
    username && date ? `/api/summary/${username}/${date}` : null,
    fetcher
  )

  return {
    summary: data?.data,
    isLoading,
    isError: error,
  }
}

/**
 * Hook to fetch filtered activities for a user and date
 */
export function useFilteredActivities(
  username: string,
  date: string,
  filters?: {
    language?: string
    actionType?: string
    limit?: number
    skip?: number
  }
) {
  const queryParams = new URLSearchParams()
  if (filters?.language) queryParams.set("language", filters.language)
  if (filters?.actionType) queryParams.set("actionType", filters.actionType)
  if (filters?.limit) queryParams.set("limit", filters.limit.toString())
  if (filters?.skip) queryParams.set("skip", filters.skip.toString())

  const queryString = queryParams.toString()
  const url =
    username && date
      ? `/api/activities/${username}/${date}${queryString ? `?${queryString}` : ""}`
      : null

  const { data, error, isLoading, mutate } = useSWR<ActivitiesResponse>(url, fetcher)

  return {
    activities: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    isError: error,
    mutate,
  }
}

/**
 * Create a new activity log
 */
export async function createActivity(activity: ActivityLog): Promise<ApiResponse<ActivityLog>> {
  const response = await fetch("/api/activity", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activity),
  })

  return response.json()
}

/**
 * Create multiple activity logs in batch
 */
export async function createActivitiesBatch(
  request: BatchActivityRequest
): Promise<ApiResponse<ActivityLog[]>> {
  const response = await fetch("/api/activity/batch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })

  return response.json()
}

/**
 * Fetch metrics for multiple dates
 */
export async function fetchBatchMetrics(
  request: BatchMetricsRequest
): Promise<ApiResponse<DetailedMetrics[]>> {
  const response = await fetch("/api/metrics/batch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })

  return response.json()
}

/**
 * Update an existing activity log
 */
export async function updateActivity(
  id: string,
  updates: Partial<ActivityLog>
): Promise<ApiResponse<ActivityLog>> {
  const response = await fetch(`/api/activity/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  })

  return response.json()
}

/**
 * Delete an activity log
 */
export async function deleteActivity(id: string): Promise<ApiResponse> {
  const response = await fetch(`/api/activity/${id}`, {
    method: "DELETE",
  })

  return response.json()
}

/**
 * Hook to fetch batch metrics for multiple dates
 */
export function useBatchMetrics(username: string, dates: string[]) {
  const key = username && dates.length > 0 ? { username, dates } : null

  const { data, error, isLoading, mutate } = useSWR<ApiResponse<DetailedMetrics[]>>(
    key,
    async ({ username, dates }: BatchMetricsRequest) => {
      const response = await fetchBatchMetrics({ username, dates })
      return response
    }
  )

  return {
    metricsData: data?.data || [],
    isLoading,
    isError: error,
    mutate,
  }
}
