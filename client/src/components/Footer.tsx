export default function Footer() {
  return (
    <footer className="bg-white border-t border-secondary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 text-center text-sm text-secondary-500">
          <p>&copy; {new Date().getFullYear()} PostHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
