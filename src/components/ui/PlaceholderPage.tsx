interface PlaceholderPageProps {
  title: string;
  description: string;
  badge?: string;
}

export default function PlaceholderPage({ title, description, badge }: PlaceholderPageProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
          {badge ?? "Coming Soon"}
        </div>

        <div className="flex items-center justify-center mb-4">
          <span className="text-4xl font-bold text-blue-700">S</span>
          <span className="text-4xl font-bold text-slate-800">crubbed In</span>
        </div>

        <h1 className="text-2xl font-semibold text-slate-800 mb-3">{title}</h1>
        <p className="text-slate-500 text-sm leading-relaxed">{description}</p>

        <div className="mt-10 border-t border-slate-100 pt-6">
          <p className="text-xs text-slate-400">
            UK Professional Network for Healthcare Staff
          </p>
        </div>
      </div>
    </main>
  );
}
