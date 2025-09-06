import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useNewsletter() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const subscribe = async (email: string) => {
    if (!email) {
      setMessage('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          setMessage('You are already subscribed to our newsletter!');
        } else {
          setMessage('Something went wrong. Please try again.');
        }
      } else {
        setMessage('You have subscribed to Outlier Alpha Ventures Newsletter');
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return { subscribe, isLoading, message };
}