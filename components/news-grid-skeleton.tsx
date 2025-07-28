import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function NewsGridSkeleton() {
  return (
    <div className="space-y-8">
      {/* Search and Sort Controls Skeleton */}
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="h-10 bg-slate-200/50 rounded-md animate-pulse"></div>
          </div>
          <div className="flex gap-2">
            <div className="w-full md:w-48 h-10 bg-slate-200/50 rounded-md animate-pulse"></div>
            <div className="w-10 h-10 bg-slate-200/50 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* News Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg overflow-hidden">
            <CardHeader className="pb-4">
              <div className="w-24 h-6 bg-slate-200/50 rounded animate-pulse mb-3"></div>
              <div className="h-6 bg-slate-200/50 rounded animate-pulse mb-2"></div>
              <div className="h-6 bg-slate-200/50 rounded animate-pulse w-3/4"></div>
            </CardHeader>

            <CardContent className="pb-4">
              <div className="space-y-2">
                <div className="h-4 bg-slate-200/50 rounded animate-pulse"></div>
                <div className="h-4 bg-slate-200/50 rounded animate-pulse"></div>
                <div className="h-4 bg-slate-200/50 rounded animate-pulse w-2/3"></div>
              </div>
            </CardContent>

            <CardFooter className="pt-4 border-t border-slate-100/50">
              <div className="w-full h-10 bg-slate-200/50 rounded animate-pulse"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
