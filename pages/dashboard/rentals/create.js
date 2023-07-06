import Layout from '@/components/Layout';
import Spinner from '@/components/Spinner';
import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import axios from 'axios';
import CreateForm from '@/components/rentals/CreateForm';

export default function Create() {
  return <CreateForm />;
}
