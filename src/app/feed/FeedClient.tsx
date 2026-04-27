"use client";

import { useAuth } from "@/lib/authContext";
import Avatar from "@/components/ui/Avatar";
import { MOCK_POSTS } from "@/lib/services/mockData";

function timeAgo(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function PostCard({ post }: { post: typeof MOCK_POSTS[number] }) {
  return (
    <article className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Author header */}
      <div className="flex items-start gap-3 p-4 pb-0">
        <Avatar name={post.authorName} size="md" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-900 text-sm leading-tight">{post.authorName}</p>
          <p className="text-xs text-slate-500">{post.authorPosition}</p>
          <p className="text-xs text-slate-400">{post.authorHospital} · {timeAgo(post.createdAt)}</p>
        </div>
        {/* Follow placeholder */}
        <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors flex-shrink-0 mt-0.5">
          + Follow
        </button>
      </div>

      {/* Content */}
      <p className="px-4 pt-3 pb-1 text-sm text-slate-800 leading-relaxed whitespace-pre-line">
        {post.content}
      </p>

      {/* Actions */}
      <div className="px-4 py-3 border-t border-slate-100 flex items-center gap-1">
        {[
          { icon: "👍", label: `Like  ${post.likeCount}` },
          { icon: "💬", label: `Comment  ${post.commentCount}` },
          { icon: "↗", label: "Share" },
        ].map((action) => (
          <button
            key={action.label}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
          >
            <span>{action.icon}</span>
            {action.label}
          </button>
        ))}
      </div>
    </article>
  );
}

export default function FeedClient() {
  const { profile } = useAuth();

  return (
    <div className="flex flex-col gap-4">
      {/* Post composer */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
        <div className="flex items-center gap-3">
          {profile && <Avatar name={profile.fullName} size="md" />}
          <button
            className="flex-1 text-left text-sm text-slate-400 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full px-4 py-2.5 transition-colors"
            disabled
            title="Posting coming in Milestone 4"
          >
            Share an update with your network…
          </button>
        </div>
        <div className="flex gap-1 mt-3 pt-3 border-t border-slate-100">
          {[
            { icon: "🖼", label: "Photo" },
            { icon: "📄", label: "Article" },
            { icon: "🏥", label: "Tag hospital" },
          ].map((btn) => (
            <button
              key={btn.label}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors"
              disabled
            >
              <span>{btn.icon}</span>
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Coming soon notice */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700 font-medium flex items-center gap-2">
        <span>🚧</span>
        <span>Live posts and real-time feed coming in Milestone 4. Showing sample posts below.</span>
      </div>

      {/* Mock posts */}
      {MOCK_POSTS.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
