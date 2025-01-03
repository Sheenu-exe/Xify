'use client';
import { useState } from 'react';
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Card, CardContent } from "../../components/ui/card";
import { Copy, RotateCw, ArrowUpRight } from "lucide-react";

export default function InteractiveForm() {
  const [tweet, setTweet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const description = formData.get('description');
    if (!description.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });
      const result = await response.json();
      if (result.tweet) setTweet(result.tweet);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (tweet) {
      navigator.clipboard.writeText(tweet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRegenerate = async () => {
    if (tweet) {
      setLoading(true);
      try {
        const response = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ description: tweet }),
        });
        const result = await response.json();
        if (result.tweet) setTweet(result.tweet);
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePostOnTwitter = () => {
    if (tweet) {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`,
        '_blank'
      );
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative">
          <Textarea
            id="description"
            name="description"
            placeholder="Express your idea..."
            className="min-h-[180px] px-3 bg-gray-950/50 backdrop-blur-sm border-gray-800 hover:border-gray-700 
                       focus:border-gray-600 rounded-xl text-gray-200 placeholder:text-gray-500 
                       transition-all duration-200 resize-none text-lg"
            disabled={loading}
          />
          <Button
            type="submit"
            size="sm"
            disabled={loading}
            className="absolute bottom-4 right-4 bg-white/5 hover:bg-white/10 text-gray-300
                     border border-gray-800 backdrop-blur-sm rounded-lg px-4 py-2 
                     transition-all duration-200 hover:border-gray-700"
          >
            {loading ? (
              <RotateCw className="w-4 h-4 animate-spin" />
            ) : (
              <ArrowUpRight className="w-4 h-4" />
            )}
          </Button>
        </div>
      </form>

      {tweet && (
        <div className="mt-8 space-y-6">
          <Card className="bg-gradient-to-b from-gray-900/50 to-gray-950/50 border-gray-800 
                          backdrop-blur-sm rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <p className="text-gray-200 text-lg font-light leading-relaxed">{tweet}</p>
            </CardContent>
          </Card>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleCopy}
              variant="outline"
              size="sm"
              className={`border-gray-800 flex justify-center items-center px-3 py-3 hover:bg-white/5 text-gray-300 rounded-lg 
                         transition-all duration-200 ${copied ? 'text-green-400' : ''}`}
            >
              <Copy className="w-4 h-4 mr-2" />
              {copied ? 'Copied' : 'Copy'}
            </Button>

            <Button
              onClick={handleRegenerate}
              variant="outline"
              size="sm"
              disabled={loading}
              className="border-gray-800 flex justify-center items-center px-3 py-3 hover:bg-white/5 text-gray-300 rounded-lg 
                         transition-all duration-200"
            >
              <RotateCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Regenerate
            </Button>

            <Button
              onClick={handlePostOnTwitter}
              size="sm"
              className="ml-auto flex justify-center items-center px-3 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 
                         hover:to-blue-400 text-white rounded-lg transition-all duration-200"
            >
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center 
                       justify-center transition-all duration-200">
          <div className="bg-gray-900/90 border border-gray-800 rounded-lg px-6 py-3 
                         flex items-center gap-3">
            <RotateCw className="w-4 h-4 animate-spin text-gray-400" />
            <span className="text-gray-300 text-sm">Generating...</span>
          </div>
        </div>
      )}
    </div>
  );
}
