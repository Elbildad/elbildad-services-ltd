<?php

namespace App\Enums;

enum QuantityEnum: string
{
    case ONE_TO_TEN = '1-10';
    case ELEVEN_TO_FIFTY = '11-50';
    case FIFTY_ONE_TO_HUNDRED = '51-100';
    case ABOVE_HUNDRED = '100+';
}
